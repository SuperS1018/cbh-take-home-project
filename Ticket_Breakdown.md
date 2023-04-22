# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
1. Insert a `customer_id` column to the Facillities table
    - implementation:
        - Insert a `customer_id` column to the Facillities table 
        - Migrate `customer_id` from Agent table
        - Set `customer_id` as a primary key for Agent table
        - Set `customer_id` as a foreign key for Facillities table
    - acceptance criteria:
        - Should be no problem to query to get report data by `customer_id`
    - estimate time:
        - 2 days
    - questions:
        - Do we also need to update Shift table to use `customer_id` as a foreign key?

2. Update `getShiftsByFacility` and `generateReport` Apis
    - implementation:
        - Update query for `getShiftsByFacility` to take `customer_id`
        - Update `generateReport` to accordingly 
    - acceptance criteria:
        - `getShiftsByFacility` should return shifts data by `customer_id`
        - `generateReport` should be no problem to create PDF report
    - estimate time:
        - 1 day

3. Update unit test for `getShiftsByFacility` and `generateReport`
    - implementation:
        - Update database id with `customer_id`
        - Run unit test locally
    - acceptance criteria:
        - Make sure no error on the unit test
    - estimate time:
        - 1 day