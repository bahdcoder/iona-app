const Event = use('Event')

Event.on('site::created', 'Sites.created')
Event.on('registered::user', 'UserRegistered.generateSshKey')
Event.on('connected::digitalocean', 'SocialConnected.digitalocean')
