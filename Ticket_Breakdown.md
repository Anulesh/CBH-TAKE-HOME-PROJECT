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
Ticket 1: Add custom Id field to Agent table

Description:
Update Agent table to add cutom Id column that can be saved by Facilities. This will allow Facilities to associate their own IDs with Agent.

Acceptance Criteria:
- The Agent table should be modified to include new column Custom_ID.
- This Custom_ID value should be unique and indexed for efficient querying. 

Implementation Details:
- Modify the Agent table in the db schema to include a new column Custom_ID.
- Ensure that the Custom_ID field is properly indexed for efficient querying.
- Update any relevant API endpoints or data access methods to handle the Custom_ID field.
- Validation checks for Custom_ID value uniqueness.
- Update any relevant documentation or UI to reflect the changes.

Effort Estimate: 2 hours


Ticket 2: Enable Facilities to Save Custom IDs for Agents

Description:
We need to provide Facilities with the ability to save custom IDs for Agents they work with. This will allow Facilities to associate their own IDs with each Agent, which will be used when generating reports.

Acceptance Criteria:
- New API endpoint and/or UI capability to take input and save custom ids for agents, if not provided generate a unique Custom_ID among Custom_IDs already generated.
- When saving a Custom_ID, validate its uniqueness among Agents within the same Facility.
- Ensure the Custom_ID is properly associated with the corresponding Agent in the db.
- Provide appropriate error handling and feedback if the Custom_ID saving/update fails.

Implementation Details:
- Add an API endpoint or UI feature to allow Facilities to input and save custom IDs for Agents.
- Validate the uniqueness of the custom ID within the Facility to avoid conflicts.
- Update the Agent table in the database with the custom ID provided by the Facility.
- Implement error handling and appropriate feedback messages for success or failure cases.

Effort Estimate: 4 hours


Ticket 3: Update Report Generation to Use Custom Agent IDs

Description:
Update Report Generation to include Custom Ids for agents

Acceptance Criteria:
- Update the report generation function to retrieve the Custom_ID for each Agent instead of the internal database ID.
- Update the PDF generation process to include the Custom_ID in the generated reports.

Implementation Details:
- Update the `generateReport` function to retrieve the custom ID of each Agent instead of the internal database ID.
- Update the report template or generation process to include the custom ID field.
- Test the report generation process with sample data to verify that the custom IDs are correctly displayed.

Effort Estimate: 3 hours


Ticket 4: Modify `getShiftsByFacility` to Include Custom Agent IDs

Description:
To support the new custom Agent IDs, we need to modify `getShiftsByFacility` method to include the custom ID of each Agent in the returned Shifts.

Acceptance Criteria:

- Update the `getShiftsByFacility` method to retrieve the custom ID of each Agent instead of the internal database ID.
- Test the modified method to verify that the custom IDs are accurately retrieved and included in the Shifts data.

Implementation Details:
- Modify the query or data retrieval logic in the `getShiftsByFacility` method to fetch the custom ID of each Agent associated with the Shifts.
- Update the data structure or metadata of the Shifts to include the custom ID field for each Agent.
- If necessary, update any related database queries or joins to fetch the custom IDs efficiently.
- Test the modified method with sample data to ensure the custom IDs are correctly retrieved and included in the returned Shifts.

Effort Estimate: 3 hours
