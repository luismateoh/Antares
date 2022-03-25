#!/bin/bash
# Avoid shifting parameters in second line, incompatible with Windows WSL2, Docker on windows
uvicorn main:app --host=0.0.0.0 --port=5000