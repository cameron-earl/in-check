## Always make sure you're up to date with origin/master
git checkout master
git pull
git checkout feature-branch
git merge master

## Always work in a feature branch
### Create feature branch
git branch feature-branch
git checkout feature-branch

OR

git checkout -b feature-branch

## When you do a thing
git add .
git commit -m "Implement a thing"

## When a feature is ready to merge to master
(commit above)
git push origin feature-branch
(submit pull request)
(have someone review code)
(tell everyone it's up)
git checkout master
git pull
git branch -d feature-branch
