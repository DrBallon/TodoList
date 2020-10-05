mongoexport -u test -p 123456 -d todolist -c counters -o "./counters .json"
mongoexport -u test -p 123456 -d todolist -c items -o "./items.json"
mongoexport -u test -p 123456 -d todolist -c groups -o "./groups .json" 
mongoexport -u test -p 123456 -d todolist -c users -o "./users .json" 