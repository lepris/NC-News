 xit('POST status:201, returns the new user as it appears in the dtabase', () => {
                let userToSend = {
                    username: 'Karolina',
                    avatar_url: 'https://ichef.bbci.co.uk/news/976/media/images/83351000/jpg/_83351965_explorer273lincolnshirewoldssouthpicturebynicholassilkstone.jpg',
                    name: 'Karolina'
                }
                return request.post('/api/users')
                    .send(userToSend)
                    .expect(201)
                    .then(({ body }) => {
                        expect(body.user).contain.keys('username', 'avatar_url', 'name');
                        expect(body.user.name).to.equal(userToSend.name);
                    })

            })

it('/POST /Topics should fail if we try to add a non unique slug', () => {
                const topicToSend = { slug: 'mitch', description: 'The man, the Mitch, the legend' };
                return request.post('/api/topics')
                    .send(topicToSend)

                    .then((res) => {
                        console.log(res.err.text)
                        expect(res.error.text).to.equal("Internal Server Error");
                    })

            });