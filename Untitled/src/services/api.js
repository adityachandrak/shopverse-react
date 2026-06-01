const API_URL =
  window.location.protocol === "https:"
    ? "/api"
    : "http://3.108.27.19:5001/api";

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: userData.fullName || userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      address: userData.address,
    }),
  });

  return response.json();
}

export async function loginUser(userData) {
  const response = await fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
}

export async function checkoutOrder({ customerId, cartItems, shippingInformation }) {
  const response = await fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ customerId, cartItems, shippingInformation }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Checkout failed");
  }

  return result;
}
