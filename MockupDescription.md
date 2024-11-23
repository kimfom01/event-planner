# **Mockup Design Descriptions**

## **1. Home Page (Event Dashboard)**

**Purpose**: Display a summary of all upcoming events and provide access to other app features.

- **Header**:

  - Logo or app name on the left.
  - Navigation links (Home, Calendar, My Events, Profile).
  - Logout button for authenticated users.

- **Main Content**:
  - **"Upcoming Events" section**:
    - A card/grid layout showing a summary of events (title, date, location).
    - A "View Details" button for each event.
  - **Quick Actions**:
    - A button to "Create New Event."

---

## **2. Calendar View Page**

**Purpose**: Allow users to visualize their events in a monthly/weekly format.

- **Header**:

  - Month and Year displayed (e.g., "November 2024").
  - Navigation arrows to move between months or weeks.
  - A "Today" button to return to the current date.

- **Main Content**:
  - A **calendar grid**:
    - Each cell represents a day.
    - Days with events are highlighted and display a preview (e.g., event count or first event title).
    - Clicking on a day shows a modal or redirects to a list of events for that day.

---

## **3. Event Details Page**

**Purpose**: Show all the details of a specific event and allow RSVP.

- **Header**:

  - Event title prominently displayed.
  - Date and time below the title.
  - Location with a small map preview.

- **Main Content**:
  - **Description**: Full details about the event.
  - **Participants**: A list of RSVPed attendees.
  - **Actions**:
    - RSVP buttons: "Attending," "Not Attending," "Maybe."
    - "Edit Event" (if the user is the event creator).
    - "Delete Event" button (if the user is the event creator).

---

## **4. Create/Edit Event Page**

**Purpose**: Form for creating or editing an event.

- **Fields**:

  - Title (text input, required).
  - Description (multiline text input).
  - Date and Time (date-time picker).
  - Location (text input with Google Maps autocomplete).
  - Participants (comma-separated emails or names).

- **Actions**:
  - "Save Event" button for submission.
  - "Cancel" button to discard changes.

---

## **5. Login/Register Page**

**Purpose**: Allow users to sign in or create an account.

- **Fields**:

  - Email input.
  - Password input.
  - "Remember Me" checkbox.
  - "Forgot Password?" link.

- **Actions**:
  - "Login" button.
  - Link to "Create Account."
