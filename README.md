# iVolunteerWebsiteRepository


#project members
#Rhys William Singrin: rsingrin@csus.edu
#Danielle Tasabia
#Maximino Licon
#Angel Espinoza
#Eduar Gutierrez


#all members have a dev branch that they do assigned sprint work on, then create a pull request to merge with main which is apporved by #other members 

HOW TO USE:
navigate to the root directory (named iVolunteerWebsiteRepository) and run the command 'make dev', this uses a make file in the root dir that runs the backend connection and the front end at the same time. If you want to run it yourself you can cd into backend and run 'npm run dev', then cd into frontend and run 'npm run dev'. you can also run make clean to delete the package-lock and nodemodule files so you can rebuild them

MAKE COMMANDS:
    make dev : launches the backend and frontend
    make clean : deletes the node_modules and package-lock files


GIT COMMANDS:
git status : checks the commit status of the files on your branch
git add . : stages all the files in the directory you are in so that you can commit them
git commit -m : pushes your changes to the local branch on your computer
git push : pushes your changes onto the github repository (now it's available to everybody)
git pull : updates your branch from the online version
git branch -a : lists all the branches
git switch 'branch name" : swaps to a branch
git merge 'branch name' : merges the branch you are in with the branch you named, after this you can 
    run git commit and git push to make that merge permanent
git log --oneline : lets you view the history of commits on the branch you are in



