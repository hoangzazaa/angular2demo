update
  sfr_sf_department
set
  sales_aggregate_flag = 1
where
  department_code in (
    "EE01", "EE02", "EE03", "EE04",
    "EE05", "EE06", "EE07", "EE08",
    "EE09", "EE10", "EE11", "EE12",
    "EE13", "EE18", "EE92", "EE94",
    "EE95", "EE98"
  )
;