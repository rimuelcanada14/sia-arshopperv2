#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from django.core.management.commands.runserver import Command as runserver

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djarshopper.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # Check if the command is 'runserver'
    if sys.argv[1] == 'runserver':
        # Adding SSL configuration
        runserver.default_addr = '0.0.0.0'
        runserver.default_port = '8000'
        runserver.default_ssl_context = ('cert.pem', 'key.pem')

    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
