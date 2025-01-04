# all routes

task_create = "/create"

task_get_all = "/get-all"

# task_get_one = "/get-one"

task_update = "/update/{_id}"

task_delete = "/delete"

task_get_by_id = "/get-by-id/{_id}"

task_get_by_priority = "/get-by-priority/{priority}"

task_get_by_due_date = "/get-by-due-date/<date:%Y-%m-%d>"

task_get_by_completed = "/get-by-completed/<bool:completed>"

task_get_by_title_or_description = "/get-by-title-or-description/<string:search_term>"

task_get_by_title_and_description = "/get-by-title-and-description/<string:title>/<string:description>"

task_get_by_due_date_range = "/get-by-due-date-range/<date:%Y-%m-%d>/<date:%Y-%m-%d>"