ARGUMENTS="${@:1}"

for i in $ARGUMENTS; do
  export $i
done

printenv

# for i in $ARGUMENTS; do
#   IFS='='
#   list=($i)
#   for ((j = 0; j < ${#list[@]}; ++j)); do
#     position=$(( $j + 1 ))
#     if [ $j -eq 2 ] then

#     fi
#     echo "$position,${list[$j]}"
#   done
# done

exit 0
