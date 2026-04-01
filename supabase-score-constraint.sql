-- Supabase SQL: enforce Stableford score constraints on the scores table
-- Run this in the Supabase SQL editor or as a migration.

ALTER TABLE public.scores
  ADD CONSTRAINT scores_stableford_score_check
  CHECK (score BETWEEN 1 AND 45);
