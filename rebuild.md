# Rebuild backend Java
docker build -f .devcontainer/java/Dockerfile.maven -t logisticants-maven .

#  Rebuild frontend Angular
docker build -f .devcontainer/angular/Dockerfile.angular -t logisticants-angular .

# Rebuild compose

docker rm -f logisticants-java logisticants-angular


### TOUJOURS REBUILD APRES MODIFICATION !!!!!!