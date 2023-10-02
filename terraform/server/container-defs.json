[
  {
    "name": "server",
    "image": "${image_location}",
    "essential": true,
    "memoryReservation": 256,
    "environment": [
      {
        "name": "ENVIRONMENT",
        "value": "${environment}"
      },
      {
        "name": "PORT",
        "value": 8000
      },
      {
        "name": "DATABASE_URl",
        "value": "${db_url}"
      },
      {
        "name": "SESSION_SECRET",
        "value": "${session_secret}"
      },
      {
        "name": "REDIS_URL",
        "value": "${redis_url}"
      },
      {
        "name": "CLOUDINARY_SECRET",
        "value": "${cloudinary_secret}"
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
        "containerPort": 8000,
        "hostPort": 8000
      }
    ]
  }
]
