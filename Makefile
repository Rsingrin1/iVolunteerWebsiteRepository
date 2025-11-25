# Makefile to run backend and frontend dev servers together
# Uses npx concurrently to run both in one terminal

.PHONY: dev backend frontend

dev:
	# Runs both dev commands and kills the other process if one exits
	npx concurrently --kill-others "npm --prefix frontend run dev" "npm --prefix backend run dev"

backend:
	cd backend && npm run dev

frontend:
	cd frontend && npm run dev
