# Order intake systems
We're looking at assuring with the partner that we're trusting one source, while everything else is just a reference.

## The Attributes

### System Flow (the architecture)
- Order lifecycle, getting events from the user, checking stock status and confirming/rejecting orders.

- State transitions. Shows the status of order shipment over its supply period.

- Failure paths. It makes sure that the failures such has request fails would be handled without corrupting the whole warehouse system.

### API Contracts
- request and responds to schemas (the inventory data credentials)
- status codes (which I believe would be a boolean variable conditionals setup?)

### Data Model
- arrangement of the data (inventory) making sure that the orders from the users end, the inventory status and notified reservations are all entact.

### Async Processing
- message publishing decisions (logical)
- consumers (users), making sure that they have a smooth end user experience.
- idempotency (denoting to an unchanged element of a set, which in this is fetching unused function calls and APIs)

### Failure and Recovery
- retries
- timeouts
- dead letter handling - a system for capturing, storing and managing messages that can't be delivered or processed successfully in a message queue, preventing data loss. Dead Letter Queue (DLQ)

### Observability

- observes correlation IDs, tracing (items?), logging (user-end or is it talking about products?)

### Process and Planning
- breaking down the task
- progress tracking
- decision logging.
(through Jira)


<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/25139aae-83bb-4624-8252-6b32e0f79e52" />

