#!/bin/bash

echo "### Merge jest and funcitional coverage reports"
export COVERAGE_TEMP_DIR=/tmp/extracted_coverage/target/kibana-coverage/
yarn nyc report --nycrc-path src/dev/code_coverage/nyc.jest.config.js
yarn nyc report --nycrc-path src/dev/code_coverage/nyc.functional.config.js
