# import frappe

# @frappe.whitelist(allow_guest=True)
# def register_user(full_name, email, password):
#     try:
#         # Input validation
#         if not full_name or not email or not password:
#             frappe.throw("All fields are required.")

#         # Email validation
#         if frappe.db.exists("user_registration", {"email": email}):
#             # Log the error for debugging
#             error_message = "Email already registered."
#             print(error_message)  # For development
#             frappe.log_error(error_message, "Register User Error")  # Logs in Frappe
#             return {"status": "error", "message": error_message}

#         # Create user registration
#         user_doc = frappe.new_doc("user_registration")
#         user_doc.update({
#             "full_name": full_name,
#             "email": email,
#             "password": password
#         })
        
#         user_doc.insert(ignore_permissions=True)
#         frappe.db.commit()

#         return {
#             "status": "success",
#             "message": "Registration successful!",
#             "name": user_doc.name
#         }

#     except Exception as e:
#         # Log unexpected errors and return a generic error message
#         frappe.log_error(frappe.get_traceback(), "Register User Error")
#         print(f"Unexpected Error: {str(e)}")  # For development
#         return {"status": "error", "message": "An unexpected error occurred"}
import frappe

@frappe.whitelist(allow_guest=True)
def register_user(full_name, email, password):
    try:
        # Validate inputs
        if not full_name or not email or not password:
            return {"message": "All fields are required."}

        # Check if email already exists
        if frappe.db.exists("user_reg", {"email": email}):  # Correct DocType name
            return {"message": "Email already registered."}

        # Create a new User Registration document
        user_doc = frappe.get_doc({
            "doctype": "user_reg",  # Correct DocType name
            "full_name": full_name,
            "email": email,
            "password": password
        })
        user_doc.insert(ignore_permissions=True)
        frappe.db.commit()

        # Return success message
        return {"message": "Registration successful!", "name": user_doc.name}

    except Exception as e:
        # Log the error
        frappe.log_error(frappe.get_traceback(), "Register User Error")
        return {"message": f"An error occurred: {str(e)}"}
