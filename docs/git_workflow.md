a## Always make sure you're up to date with origin/master
1. `git checkout master`
2. `git pull`
3. `git checkout feature-branch`
4. `git merge master`

## Always work in a feature branch
### Create feature branch
1. `git branch feature-branch`
2. `git checkout feature-branch`

OR
1. `git checkout -b feature-branch`

### When you do any little thing in your feature branch
1. `git add .`
2. `git commit -m "Implement a thing"`

### When a feature is ready to merge to master
1. Make sure all changes are committed (see above)
2. `git push origin feature-branch`
3. submit pull request
4. have someone review code and merge pull request
5. tell everyone it's up
6. `git checkout master`
7. `git pull`
8. `git branch -d feature-branch`

## If you go to merge and a weird screen comes up with a merge commit message
1. `:wq`

## Push to heroku
(This is after creating a heroku repo)
1. `git push heroku master`
