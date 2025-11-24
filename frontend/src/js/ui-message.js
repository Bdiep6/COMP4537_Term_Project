/**
 * @file ui-message.js
 * @author Yujin Jeong, Evan Vink, Brian Diep
 * @version 1.0
 * @description This file contains the UIMessage class that manages messages for the user interface (used in HTML files).
 */

class UIMessage {

  /**
   * Constructor for UIMessage class.
   */
  constructor() {
    window.addEventListener("DOMContentLoaded", () => this.init());
  }

  /**
   * Initialize DOM elements.
   */
  init() {
    // Admin page
    this.admin_title               = document.getElementById("admin-title");
    this.admin_logo                = document.getElementById("admin-logo");
    this.admin_logout              = document.getElementById("admin-logout");
    this.admin_header              = document.getElementById("admin-header");
    this.admin_purpose             = document.getElementById("admin-purpose");
    this.admin_total_users         = document.getElementById("admin-total-users");
    this.admin_total_api_calls     = document.getElementById("admin-total-api-calls");
    this.admin_user_statistics     = document.getElementById("admin-user-statistics");
    this.admin_user_username       = document.getElementById("admin-user-username");
    this.admin_user_email          = document.getElementById("admin-user-email");
    this.admin_user_api_calls_used = document.getElementById("admin-user-api-calls-used");
    this.admin_user_remaining      = document.getElementById("admin-user-remaining");

    // AI page
    this.ai_title                = document.getElementById("ai_title");
    this.ai_logo                 = document.getElementById("ai_logo");
    this.ai_back_button          = document.getElementById("ai_back_button");
    this.ai_header               = document.getElementById("ai_header");
    this.ai_description          = document.getElementById("ai_description");
    this.ai_input_label          = document.getElementById("ai_input_label");
    this.ai_send_button          = document.getElementById("ai_send_button");
    this.ai_clear_button         = document.getElementById("ai_clear_button");
    this.ai_response_header      = document.getElementById("ai_response_header");
    this.ai_response_placeholder = document.getElementById("ai_response_placeholder");

    // Login page
    this.login_navbar          = document.getElementById("login_navbar");
    this.login_title           = document.getElementById("login_title");
    this.login_header          = document.getElementById("login_header");
    this.login_subtitle        = document.getElementById("login_subtitle");
    this.login_email_label     = document.getElementById("login_email_label");
    this.login_password_label  = document.getElementById("login_password_label");
    this.login_submit_button   = document.getElementById("login_submit_button");
    this.login_register_prompt = document.getElementById("login_register_prompt");
    this.login_register_link   = document.getElementById("login_register_link");

    // Registration page
    this.register_title                  = document.getElementById("register_title");
    this.register_header                 = document.getElementById("register_header");
    this.register_subtitle               = document.getElementById("register_subtitle");
    this.register_username_label         = document.getElementById("register_username_label");
    this.register_email_label            = document.getElementById("register_email_label");
    this.register_password_label         = document.getElementById("register_password_label");
    this.register_confirm_password_label = document.getElementById("register_confirm_password_label");
    this.register_submit_button          = document.getElementById("register_submit_button");
    this.register_login_prompt           = document.getElementById("register_login_prompt");
    this.register_login_link             = document.getElementById("register_login_link");

    // User page
    this.user_title                     = document.getElementById("user_title");
    this.user_logo                      = document.getElementById("user_logo");
    this.user_logout                    = document.getElementById("user_logout");
    this.user_welcome_message           = document.getElementById("user_welcome_message");
    this.user_welcome_subtitle          = document.getElementById("user_welcome_subtitle");
    this.user_remaining_api_calls_label = document.getElementById("user_remaining_api_calls_label");
    this.user_total_requests_label      = document.getElementById("user_total_requests_label");
    this.user_ai_service_access         = document.getElementById("user_ai_service_access");
    this.user_ai_service_description    = document.getElementById("user_ai_service_description");
    this.user_ai_button                 = document.getElementById("user_ai_button");
    this.user_collection                = document.getElementById("user_collection");
    this.user_collection_description    = document.getElementById("user_collection_description");
    this.user_collection_button         = document.getElementById("user_collection_button");
    this.user_naturedex                 = document.getElementById("user_naturedex");
    this.user_naturedex_description     = document.getElementById("user_naturedex_description");
    this.user_naturedex_button          = document.getElementById("user_naturedex_button");

    // Nature dex page
    this.naturedex_title               = document.getElementById("naturedex_title");
    this.naturedex_logo                = document.getElementById("naturedex_logo");
    this.naturedex_back_button         = document.getElementById("naturedex_back_button");
    this.naturedex_header              = document.getElementById("naturedex_header");
    this.naturedex_description         = document.getElementById("naturedex_description");
    this.naturedex_achievements_title  = document.getElementById("naturedex_achievements_title"); 
    
    // Labels for flower, tree, rock in counter rows
    this.naturedex_flower_label        = document.getElementById("naturedex_flower_label");
    this.naturedex_tree_label          = document.getElementById("naturedex_tree_label");
    this.naturedex_rock_label          = document.getElementById("naturedex_rock_label");
    
    // Badge titles
    this.naturedex_badge_flower_title        = document.getElementById("naturedex_badge_flower_title");
    this.naturedex_badge_tree_title          = document.getElementById("naturedex_badge_tree_title");
    this.naturedex_badge_rock_title          = document.getElementById("naturedex_badge_rock_title");



    this.setTexts();
  }

  /**
   * Set texts for various UI elements based on language files.
   */
  setTexts() {
    
    // Admin page
    if (typeof ADMIN_LANG !== "undefined") {
      this.admin_title.textContent               = ADMIN_LANG.ADMIN_TITLE;
      this.admin_logo.textContent                = ADMIN_LANG.ADMIN_LOGO;
      this.admin_logout.textContent              = ADMIN_LANG.ADMIN_LOGOUT;
      this.admin_header.textContent              = ADMIN_LANG.ADMIN_HEADER;
      this.admin_purpose.textContent             = ADMIN_LANG.ADMIN_PURPOSE;
      this.admin_total_users.textContent         = ADMIN_LANG.ADMIN_TOTAL_USERS;
      this.admin_total_api_calls.textContent     = ADMIN_LANG.ADMIN_TOTAL_API_CALLS;
      this.admin_user_statistics.textContent     = ADMIN_LANG.ADMIN_USER_STATISTICS;
      this.admin_user_username.textContent       = ADMIN_LANG.ADMIN_USER_USERNAME;
      this.admin_user_email.textContent          = ADMIN_LANG.ADMIN_USER_EMAIL;
      this.admin_user_api_calls_used.textContent = ADMIN_LANG.ADMIN_USER_API_CALLS_USED;
      this.admin_user_remaining.textContent      = ADMIN_LANG.ADMIN_USER_REMAINING;
    }

    // AI page
    if (typeof AI_LANG !== "undefined") {
      this.ai_title.textContent                = AI_LANG.AI_TITLE;
      this.ai_logo.textContent                 = AI_LANG.AI_LOGO;
      this.ai_back_button.textContent          = AI_LANG.AI_BACK_BUTTON;
      this.ai_header.textContent               = AI_LANG.AI_HEADER;
      this.ai_description.textContent          = AI_LANG.AI_DESCRIPTION;
      this.ai_input_label.textContent          = AI_LANG.AI_INPUT_LABEL;
      this.ai_send_button.textContent          = AI_LANG.AI_SEND_BUTTON;
      this.ai_clear_button.textContent         = AI_LANG.AI_CLEAR_BUTTON;
      this.ai_response_header.textContent      = AI_LANG.AI_RESPONSE_HEADER;
      this.ai_response_placeholder.textContent = AI_LANG.AI_RESPONSE_PLACEHOLDER;
    }

    // Login page
    if (typeof LOGIN_LANG !== "undefined") {
        this.login_navbar.textContent          = LOGIN_LANG.LOGIN_NAVBAR;
        this.login_title.textContent           = LOGIN_LANG.LOGIN_TITLE;
        this.login_header.textContent          = LOGIN_LANG.LOGIN_HEADER;
        this.login_subtitle.textContent        = LOGIN_LANG.LOGIN_SUBTITLE;
        this.login_email_label.textContent     = LOGIN_LANG.LOGIN_EMAIL_LABEL;
        this.login_password_label.textContent  = LOGIN_LANG.LOGIN_PASSWORD_LABEL;
        this.login_submit_button.textContent   = LOGIN_LANG.LOGIN_SUBMIT_BUTTON;
        this.login_register_prompt.innerHTML   = LOGIN_LANG.LOGIN_REGISTER_PROMPT + ' <a href="registration.html" id="login_register_link">' + LOGIN_LANG.LOGIN_REGISTER_LINK + '</a>';
    }

    // Registration page
    if (typeof REGISTER_LANG !== "undefined") {
        this.register_title.textContent                  = REGISTER_LANG.REGISTER_TITLE;
        this.register_header.textContent                 = REGISTER_LANG.REGISTER_HEADER;
        this.register_subtitle.textContent               = REGISTER_LANG.REGISTER_SUBTITLE;
        this.register_username_label.textContent         = REGISTER_LANG.REGISTER_USERNAME_LABEL;
        this.register_email_label.textContent            = REGISTER_LANG.REGISTER_EMAIL_LABEL;
        this.register_password_label.textContent         = REGISTER_LANG.REGISTER_PASSWORD_LABEL;
        this.register_confirm_password_label.textContent = REGISTER_LANG.REGISTER_CONFIRM_PASSWORD_LABEL;
        this.register_submit_button.textContent          = REGISTER_LANG.REGISTER_SUBMIT_BUTTON;
        this.register_login_prompt.innerHTML             = REGISTER_LANG.REGISTER_LOGIN_PROMPT + ' <a href="login.html" id="register_login_link">' + REGISTER_LANG.REGISTER_LOGIN_LINK + '</a>';
        
    }

    // User page
    if (typeof USER_LANG !== "undefined") {
        this.user_title.textContent                     = USER_LANG.USER_TITLE;
        this.user_logo.textContent                      = USER_LANG.USER_LOGO;
        this.user_logout.textContent                    = USER_LANG.USER_LOGOUT;
        this.user_welcome_message.textContent           = USER_LANG.USER_WELCOME_MESSAGE.replace("{username}", `${this.getUsername()}`);
        this.user_welcome_subtitle.textContent          = USER_LANG.USER_WELCOME_SUBTITLE;
        this.user_remaining_api_calls_label.textContent = USER_LANG.USER_REMAINING_API_CALLS_LABEL;
        this.user_total_requests_label.textContent      = USER_LANG.USER_TOTAL_REQUESTS_LABEL;
        this.user_ai_service_access.textContent         = USER_LANG.USER_AI_SERVICE_ACCESS;
        this.user_ai_service_description.textContent    = USER_LANG.USER_AI_SERVICE_DESCRIPTION;
        this.user_ai_button.textContent                 = USER_LANG.USER_AI_BUTTON;
        this.user_collection.textContent                = USER_LANG.USER_COLLECTION;
        this.user_collection_description.textContent    = USER_LANG.USER_COLLECTION_DESCRIPTION;
        this.user_collection_button.textContent         = USER_LANG.USER_COLLECTION_BUTTON;
        this.user_naturedex.textContent                 = USER_LANG.USER_NATUREDEX;
        this.user_naturedex_description.textContent     = USER_LANG.USER_NATUREDEX_DESCRIPTION;
        this.user_naturedex_button.textContent          = USER_LANG.USER_NATUREDEX_BUTTON;
      }

    if (typeof ND_LANG !== "undefined") {
        // Nature dex page main texts
        this.naturedex_title.textContent              = ND_LANG.ND_TITLE;
        this.naturedex_logo.textContent               = ND_LANG.ND_LOGO;
        this.naturedex_back_button.textContent        = ND_LANG.ND_BACK_BUTTON;
        this.naturedex_header.textContent             = ND_LANG.ND_HEADER;
        this.naturedex_description.textContent        = ND_LANG.ND_DESCRIPTION;
        this.naturedex_achievements_title.textContent = ND_LANG.ND_ACHIEVEMENTS_TITLE; 

        // Labels for flower, tree, rock counter rows
        this.naturedex_flower_label.textContent = ND_LANG.ND_FLOWER_LABEL;
        this.naturedex_tree_label.textContent   = ND_LANG.ND_TREE_LABEL;
        this.naturedex_rock_label.textContent   = ND_LANG.ND_ROCK_LABEL;
        
        // Badge titles
        this.naturedex_badge_flower_title.textContent = ND_LANG.ND_BADGE_FLOWER_TITLE;
        this.naturedex_badge_tree_title.textContent   = ND_LANG.ND_BADGE_TREE_TITLE;
        this.naturedex_badge_rock_title.textContent   = ND_LANG.ND_BADGE_ROCK_TITLE;

        
    }
  }

  /**
   * Clear the message display.
   */
  clearMessage() {

  }

  /**
   * Get username from local storage.
   * @returns {string} Username or "User not found" if not available.
   */
  getUsername() 
  {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).username : "User not found";
  }

}

// Initialize UIMessage class
const uiMessage = new UIMessage();
