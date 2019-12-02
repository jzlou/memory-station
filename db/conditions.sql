CREATE TYPE devices AS ENUM (
  'raspberrypi',
  'vendor',
  'unknown'
);

CREATE TYPE environments AS ENUM (
  'indoors',
  'outdoors'
);

CREATE TABLE locations (
  id int PRIMARY KEY,
  name varchar NOT NULL,
  created_at timestamptz NOT NULL,
  environment environments NOT NULL,
  device devices NOT NULL,
  sensor_type varchar
);

CREATE TABLE conditions (
  time timestamptz NOT NULL,
  location_id int NOT NULL,
  temperature real,
  humidity real
);

ALTER TABLE conditions ADD FOREIGN KEY (location_id) REFERENCES locations (id);

SELECT create_hypertable(
    main_table := 'conditions',
    time_column_name := 'time',
    partitioning_column := 'location_id',
    number_partitions := 1
);
