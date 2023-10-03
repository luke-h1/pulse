[
  {
    "name": "frontend",
    "image": "${image_location}",
    "essential": true,
    "memoryReservation": 256,
    "environment": [
      {
        "name": "PUBLIC_URL",
        "value": "${public_url}"
      },
      {
        "name": "PUBLIC_PULSE_API_URL",
        "value": "${public_pulse_api_url}"
      },
      {
        "name": "PUBLIC_CLOUDINARY_CLOUD_NAME",
        "value": "${public_cloudinary_cloud_name}"
      },
      {
        "name": "PUBLIC_CLOUDINARY_KEY",
        "value": "${public_cloudinary_key}"
      }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "${aws_log_group}",
        "awslogs-region": "${aws_region}",
        "awslogs-stream-prefix": "server"
      }
    },
    "porttomappings": [
      {
        "containerPort": 3000,
        "hostPort": 3000
      }
    ]
  }
]
