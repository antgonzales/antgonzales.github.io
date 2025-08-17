#!/bin/bash

# Function to display usage
usage() {
	echo "Usage: $0 [-f|--force] <folder_path>"
	exit 1
}

# Parse command-line options
force=false
while [[ $# -gt 0 ]]; do
	case "$1" in
	-f | --force)
		force=true
		shift
		;;
	-h | --help)
		usage
		;;
	--) # End of options
		shift
		break
		;;
	-*) # Unknown option
		echo "Error: Invalid option '$1'"
		usage
		;;
	*) # Folder path
		folder_path="$1"
		shift
		break
		;;
	esac
done

# Check if a folder path is provided
if [ -z "$folder_path" ]; then
	echo "Error: Folder path is required."
	usage
fi

# Check if the folder exists
if [ ! -d "$folder_path" ]; then
	echo "Error: Folder '$folder_path' does not exist."
	exit 1
fi

# Change directory to the provided folder
cd "$folder_path" || {
	echo "Error: Failed to change directory to '$folder_path'"
	exit 1
}

# Process files using globbing
for file in *.png *.jpg *.jpeg; do
	if [[ -f "$file" ]]; then
		if [[ "$file" == *.png ]]; then
			webp_file="${file%.png}.webp"
		elif [[ "$file" == *.jpg ]]; then
			webp_file="${file%.jpg}.webp"
		elif [[ "$file" == *.jpeg ]]; then
			webp_file="${file%.jpeg}.webp"
		fi

		if [[ $force == true ]] || [[ ! -f "$webp_file" ]]; then
			cwebp -q 75 "$file" -o "$webp_file"
			echo "Converted $file to $webp_file"
		else
			echo "Skipping $file, $webp_file already exists"
		fi
	fi
done
