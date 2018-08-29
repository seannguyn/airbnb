from datetime import datetime

def compareDate (date_start, date_end):
    date_start = datetime.strptime(date_start, '%Y-%m-%d')
    date_end = datetime.strptime(date_end, '%Y-%m-%d')
    diff = date_end - date_start
    print(type(diff))
    if diff.days > 0:
        return 1
    else:
        return 0