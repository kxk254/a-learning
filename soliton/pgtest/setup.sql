CREATE TABLE weather (
    city            varchar(80) references cities(name),

    temp_lo         int,           -- 最低気温
    temp_hi         int,           -- 最高気温
    prcp            real,          -- 降水量
    date            date
);

CREATE TABLE cities (
    name            varchar(80) primary key,
    location        point
);
