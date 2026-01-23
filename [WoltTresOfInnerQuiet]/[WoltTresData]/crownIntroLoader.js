export const crownIntroLoader = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      font-family: system-ui, sans-serif;
    }

    .loader {
      align-items: center;
      border: 16px solid rgba(119, 119, 119, 0.05);
      border-radius: 50%;
      box-shadow:
        0 0 5px #f1f1f1,
        0 0 5px #d1d1d1 inset;
      display: flex;
      height: 100px;
      justify-content: center;
      width: 100px;
      position: relative;
    }

    .text {
      color: #888;
      font-size: 10px;
      font-weight: 200;
      opacity: 1;
      position: absolute;
      bottom: -22px;
    }

    .dot,
    .shadow {
      background-color: #ccc;
      border-radius: 50%;
      height: 16px;
      width: 16px;
      position: absolute;
    }

    .shadow:nth-child(1) {
      animation: orbit 1s infinite 0.02s;
    }

    .shadow:nth-child(2) {
      animation: orbit 1s infinite 0.04s;
    }

    .shadow:nth-child(3) {
      animation: orbit 1s infinite 0.06s;
    }

    .dot {
      animation: orbit 1s infinite;
      background-color: #bbb;
      height: 18px;
      width: 18px;
    }

    @keyframes orbit {
      from {
        transform: rotate(0deg) translateX(42px) rotate(0deg);
      }
      to {
        transform: rotate(360deg) translateX(42px) rotate(-360deg);
      }
    }
  </style>
</head>
<body>
  <div class="loader">
    <span class="shadow"></span>
    <span class="shadow"></span>
    <span class="shadow"></span>
    <span class="dot"></span>
   
  </div>
</body>
</html>
`;
