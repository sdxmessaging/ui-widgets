
echo
if [ -e ".commit" ]
    then
    rm -r ".commit"
    git add coverage/lcov.info
    git commit --amend -C HEAD --no-verify
fi
exit