const Event = use('Event')

Event.once('registered::user', 'UserRegistered.generateSshKey')
Event.once('connected::digitalocean', 'SocialConnected.digitalocean')
