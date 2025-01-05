#!/bin/bash

folder_path="public/img"
output_file="public/images.json"

file_names=$(ls "$folder_path")

json_array="["

first=true
for file in $file_names; do
    if [ -f "$folder_path/$file" ]; then
        if [ "$first" = true ]; then
            json_array="$json_array\"$file\""
            first=false
        else
            json_array="$json_array, \"$file\""
        fi
    fi
done

json_array="$json_array]"

echo "$json_array" > "$output_file"