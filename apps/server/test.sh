#!/bin/bash

# test for prisma being a **** in unit/integration tests and not resetting the DB properly
for i in {1..100}
do
    pnpm t
    if [ $? -ne 0 ]; then
        echo "Test $i failed with exit code $?"
        exit 1
    fi
    echo "Test $i passed" >> test.txt
done
