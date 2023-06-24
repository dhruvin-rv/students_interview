### Employee Management System

### Features

- Create employee with address
- Edit employee details using employee id
- Get all employee
- Get employee by email address
- Delete employee by id

### Response Status Code in Payload

- These are response payload status code which help frontend developer to handle API call more better way.

  | Response Type | Status Code |
  | ------------- | ----------- |
  | Success       | 1           |
  | Failed        | 0           |
  | Warning       | 3           |
  | Error         | 4           |

### Response Payload Example

### JSON

```json
{
  "status": "number",
  "message": "response message",
  "data": "object, array, null",
  "error": "object, array, null"
}
```
