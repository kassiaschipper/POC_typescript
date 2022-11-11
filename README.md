
# Medical Appointments Organizer

This API is a simple medical appointment organizer that will give you easy 
access to your medical appointment, scheduled, canceled or already held. 
It will also allow you to check how many appointments were registered with the same specialist and filter appointments by appointment status.


## Author

- [@kassiaschipper](https://github.com/kassiaschipper)


## Documentation

#### Returns all appointments

```http
  GET /appointments 
```

#### Filter appointments by status 

```http
  GET /appointments/status
```

| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `status`      | `string` | **Required**. Query paramiter options :Consulta Marcada, Consulta Cancelada, Consulta Realizada) |

#### Appointments counting 

```http
  GET /appointments/scheduled
```

###  Insert appointments

```http
   POST /appointments
```
| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `specialistDoctor`      | `strig` |  **Required**. Scheduled medical specialty
| `appointmentDate`| `string or Date`| **Required**. Date of medical appointment (YYYY-MM-DD)
| `appointmentAddress`| `string`| **Required**. Address where the appointment will be held
| `comments` | `string`| **Optional**. Additional remarks
| `status` |`strig`|  **Required**. Status options Consulta Marcada, Consulta Cancelada, Consulta Realizada


#### Delete appointments by id

```http
   DELETE /appointments/:id
```
| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. Will delete the appointment selected by id |


#### Update status appointments by id
```http
   PUT /appointments/:id
```
| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Required**. Route param will select the appointment by its Id|
| `status` | `string` | **Required**. Body param will update the value of the status.  Only will accepts the already presented options   |




## Functionalities

- List all appointments
- Insert new appointments
- Delete appointments
- Update appointments by id
- Filter appointments by status
- Appointments counting grouped by specialist
