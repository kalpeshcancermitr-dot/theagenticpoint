-- Add is_case_study column to portfolio_projects.
-- true  = real, verified client work that can be presented as a case study.
-- false = illustrative example / capability demonstration.
-- Existing rows default to false until explicitly confirmed as real client work.

ALTER TABLE portfolio_projects
  ADD COLUMN IF NOT EXISTS is_case_study boolean NOT NULL DEFAULT false;
