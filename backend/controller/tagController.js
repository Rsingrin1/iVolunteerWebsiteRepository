import Tag from "../model/tagModel.js";

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags || []);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const createTag = async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Tag name is required." });
    }

    // avoid duplicates
    const exists = await Tag.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Tag already exists." });
    }

    // Only include slug if provided and non-empty
    const tagData = { name, description };
    if (slug && slug.trim() !== "") {
      tagData.slug = slug;
    }

    const tag = new Tag(tagData);
    const saved = await tag.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tag.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Tag not found." });
    }
    res.status(200).json({ message: "Tag deleted.", tag: deleted });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export default { getAllTags, createTag, deleteTag };
