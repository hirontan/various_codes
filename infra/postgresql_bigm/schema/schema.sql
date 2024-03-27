CREATE TABLE IF NOT EXISTS samples (
    id SERIAL PRIMARY KEY,
    data JSONB
);

CREATE MATERIALIZED VIEW IF NOT EXISTS data_search AS (
    SELECT
        id,
        data
    FROM
        samples
);
CREATE EXTENSION IF NOT EXISTS pg_bigm;
CREATE INDEX data_search_data_idx ON data_search USING gin (data gin_bigm_ops);
