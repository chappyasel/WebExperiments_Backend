#!/bin/bash

# Print the # of lines of code for Web Experiments among other functions

DIR="."
MATCH="/(api|client/src)/"
EXLCUDE="statMap.ts","v0",".build"
LANGUAGES="Java,JavaScript,PHP,Python,Shell,SQL,TypeScript"

function count {
    # To audit files: --by-file
    cloc $DIR \
        --match-d=$MATCH \
        --exclude-dir=$EXLCUDE \
        --include-lang=$LANGUAGES
}

function diffs {
    cloc --diff $DIR "." \
        --match-d=$MATCH \
        --exclude-dir=$EXLCUDE \
        --include-lang=$LANGUAGES
}

function list {
    git log --graph \
            --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)' \
            --abbrev-commit
}

while [ "$1" != "" ]; do
    case $1 in
        -l | --list )
            list
            exit 0;;
        -c | --commit )
            DIR=$2
            count
            exit 0;;
        -d | --diff )
            DIR=$2
            diffs
            exit 0;;
        -h | --help | * )
            echo "Usage: ./line_count.sh [--diff GIT_COMMIT] [--commit GIT_COMMIT] [--list]"
            exit 0;;
    esac
    shift
done

count
exit 0
