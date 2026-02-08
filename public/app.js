// helpers
function getToken() {
  return localStorage.getItem("token");
}

function redirectIfLoggedIn() {
  if (getToken()) window.location.href = "/dashboard.html";
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("edit_id");
  localStorage.removeItem("edit_title");
  localStorage.removeItem("edit_rating");
  localStorage.removeItem("edit_comment");
  window.location.href = "/";
}

function showBox(id, text, ok = true) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = "block";
  el.className = "alert " + (ok ? "ok" : "err");
  el.innerText = text;
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// REGISTER
async function register() {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: regUsername.value,
      email: regEmail.value,
      password: regPassword.value
    })
  });

  const data = await res.json();
  alert(data.message || "Registered successfully");
}

// LOGIN
async function login() {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value
    })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "/dashboard.html";
  } else {
    alert(data.message || "Login error");
  }
}

// PROFILE (GET)
async function loadProfile() {
  const res = await fetch("/api/users/profile", {
    headers: { Authorization: `Bearer ${getToken()}` }
  });

  const data = await res.json();
  const el = document.getElementById("profile");
  if (el) el.innerText = `Username: ${data.username}\nEmail: ${data.email}`;
}

// PROFILE (PUT)
async function updateProfile() {
  const body = {};
  if (newUsername.value.trim()) body.username = newUsername.value.trim();
  if (newEmail.value.trim()) body.email = newEmail.value.trim();

  const res = await fetch("/api/users/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  if (!res.ok) return showBox("pmsg", data.message || "Update error", false);

  showBox("pmsg", "Profile updated!", true);
  loadProfile();
}

// MY REVIEWS (GET private)
async function loadMyReviews() {
  const res = await fetch("/api/reviews", {
    headers: { Authorization: `Bearer ${getToken()}` }
  });

  const data = await res.json();
  const root = document.getElementById("reviews");
  if (!root) return;

  root.innerHTML = "";

  if (!res.ok) {
    root.innerHTML = `<div class="alert err">${escapeHtml(data.message || "Error")}</div>`;
    return;
  }

  if (data.length === 0) {
    root.innerHTML = `<div class="alert">No reviews yet.</div>`;
    return;
  }

  data.forEach(r => {
    root.innerHTML += `
      <div class="card">
        <div class="row" style="justify-content:space-between;">
          <b>${escapeHtml(r.movieTitle)}</b>
          <span>⭐ ${r.rating}/10</span>
        </div>
        <p style="white-space:pre-wrap;">${escapeHtml(r.comment)}</p>
        <div class="row">
          <button class="secondary"
            onclick="startEdit('${r._id}', '${escapeHtml(r.movieTitle)}', ${r.rating}, '${escapeHtml(r.comment)}', ${r.movieId})">
            Edit
          </button>
          <button class="secondary" onclick="deleteReview('${r._id}')">
            Delete
          </button>
        </div>
      </div>
    `;
  });
}

// EDIT helpers
function startEdit(id, title, rating, comment, movieId) {
  localStorage.setItem("edit_id", id);
  localStorage.setItem("edit_title", title);
  localStorage.setItem("edit_rating", String(rating));
  localStorage.setItem("edit_comment", comment);
  localStorage.setItem("edit_movieId", String(movieId || ""));
  window.location.href = "/create.html";
}

function prefillEditIfAny() {
  const id = localStorage.getItem("edit_id");
  if (!id) return;

  const titleEl = document.getElementById("formTitle");
  if (titleEl) titleEl.innerText = "Edit Review";

  movieId.value = localStorage.getItem("edit_movieId") || "";
  movieTitle.value = localStorage.getItem("edit_title") || "";
  rating.value = localStorage.getItem("edit_rating") || "8";
  comment.value = localStorage.getItem("edit_comment") || "";
}

function cancelEdit() {
  localStorage.removeItem("edit_id");
  localStorage.removeItem("edit_title");
  localStorage.removeItem("edit_rating");
  localStorage.removeItem("edit_comment");
  localStorage.removeItem("edit_movieId");
  window.location.href = "/dashboard.html";
}

// CREATE or UPDATE review (POST/PUT private)
async function createOrUpdateReview() {
  const id = localStorage.getItem("edit_id");

  const payload = {
    movieId: Number(movieId.value),
    movieTitle: movieTitle.value,
    rating: Number(rating.value),
    comment: comment.value
  };

  const url = id ? `/api/reviews/${id}` : "/api/reviews";
  const method = id ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) return showBox("msg", data.message || "Save error", false);

  cancelEdit();
}

// DELETE review (private)
async function deleteReview(id) {
  const res = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  });

  const data = await res.json();
  if (!res.ok) return alert(data.message || "Delete error");

  loadMyReviews();
}

// PUBLIC REVIEWS (GET /api/reviews/public)
async function loadPublicReviews() {
  const res = await fetch("/api/reviews/public");
  const data = await res.json();

  const root = document.getElementById("publicReviews");
  if (!root) return;

  root.innerHTML = "";

  if (!res.ok) {
    root.innerHTML = `<div class="alert err">${escapeHtml(data.message || "Error")}</div>`;
    return;
  }

  if (data.length === 0) {
    root.innerHTML = `<div class="alert">No public reviews yet.</div>`;
    return;
  }

  data.forEach(r => {
    root.innerHTML += `
      <div class="card">
        <div class="row" style="justify-content:space-between;">
          <b>${escapeHtml(r.movieTitle)}</b>
          <span>⭐ ${r.rating}/10</span>
        </div>
        <small>by ${escapeHtml(r.user?.username || "Unknown")}</small>
        <p style="white-space:pre-wrap;">${escapeHtml(r.comment)}</p>
      </div>
    `;
  });
}
