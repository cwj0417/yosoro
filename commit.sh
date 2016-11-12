version=$1;
release=$2;
if [[ $version && $release ]]
then
	echo $version $release;
	node setversion.js $version;
	echo "### v$version" >> RELEASE.MD;
	i=1;
	while((1==1))
    do
            split=`echo $release|cut -d "," -f$i`
            if [[ "$split" != "" && "$split" != "$release" ]]
            then
                    ((i++))
                    echo +  $split >> RELEASE.MD;
            else
                    if [ "$split" == "$release" ]
                    then
                        echo +  $split >> RELEASE.MD;
                    fi
                    break
            fi
    done
    echo "" >> RELEASE.MD;
    git add .
    git commit -m 'version'${version}''
	git tag v${version}
    git push yosoro master:master
	git push yosoro v{version}
fi
