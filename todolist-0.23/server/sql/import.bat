mongoimport -u test -p 123456 -d todolist -c counters --file "./counters .json"
mongoimport -u test -p 123456 -d todolist -c items --file "./items.json"
mongoimport -u test -p 123456 -d todolist -c groups --file "./groups .json" 
mongoimport -u test -p 123456 -d todolist -c users --file "./users .json" 