import Tag from "../model/tagModel.js";

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    if (!tags || tags.length === 0) {
      return res.status(404).json({ message: "No tags found." });
    }
    res.status(200).json(tags);
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

    const tag = new Tag({ name, slug, description });
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
