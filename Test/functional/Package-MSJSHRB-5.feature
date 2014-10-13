@libraries=Package-MSJSHRB-2-steps.js
Feature: Package: Add cucumber report output format.
  As a developer
  I can generate cucumber formatted jshint reports
  So that I can use the cucumber bamboo report plugin which provides a more user friendly UI

  Scenario: Lint code with no errors with cucumber output

    Given I have a no-lint-errors Javascript file
    When I lint the file with the cucumber format set
    Then a report is produced in cucumber format with passes

  @linked=MSJSHRB-7
  Scenario: Lint code with errors with cucumber output

    Given I have a lint-errors Javascript file
    When I lint the file with the cucumber format set
    Then a report is produced in cucumber format with failures