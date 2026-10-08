# Architecture

The project follows the **Model-View-Controller (MVC)** pattern:

- **Model:** The Rust backend canister exposes its API through Candid.
- **View:** The React frontend composes the UI and calls the controller.
- **Controller:** Generated Candid bindings and `frontend/src/controller/controller.js` handle data exchange between the frontend and backend.

Internet Identity provides the caller identity used by the backend to associate asset registrations with users. Public verification is handled by a backend query.

![Architecture flowchart](assets/architecture-flowchart.png)
