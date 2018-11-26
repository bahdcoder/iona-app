'use strict'

const slugify = use('slugify')
const { exec } = use('child_process')
const Sshkey = use('App/Models/Sshkey')
const { generate } = use('randomstring')

const UserRegistered = (exports = module.exports = {})

UserRegistered.generateSshKey = async user => {
  const keyname = `iona-${slugify(user.name)}-${generate({ length: 6 })}`

  const sshkeygen = exec(
    `ssh-keygen -f ~/.ssh/${keyname} -t ecdsa -b 521 -P '' -C worker@iona.app`
  )

  sshkeygen.stdout.on('data', () => {
    const catsshkey = exec(`cat ~/.ssh/${keyname}.pub`)

    catsshkey.stdout.on('data', async buffer => {
      await Sshkey.create({
        name: keyname,
        user_id: user.id,
        public_key: buffer.toString()
      })
    })
  })

  sshkeygen.on('error', error => {
    console.log(`STDOUT ERROR`, error)
  })
}
