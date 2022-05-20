#!/bin/bash
# Check if the script tag for react-devtools exists in the html file, otherwise add a new one.
head -n4 index.html | tail -n1 | grep -q '<script src="http://localhost:8097"></script>' || (awk 'NR==4{print "<script src=\"http://localhost:8097\"></script>"}1' index.html > tmp && mv tmp index.html)