const Event = use('Event')

Event.once('registered::user', 'UserRegistered.generateSshKey')
Event.once('connected::digitalocean', 'SocialConnected.digitalocean')
Event.once('connected::github', 'SocialConnected.github')
