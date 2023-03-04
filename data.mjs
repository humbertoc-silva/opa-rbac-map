import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';

try {
    const tuples = {};
    let user;
    let startJ = 0, startK = 0;
    for (let i = 0; i < process.argv[2]; i++) {
        user = `user_${i}`;
        tuples[user] = {};
        let role;
        let endJ = startJ + 10;
        for (let j = startJ; j < endJ; j++, startJ++) {
            role = `role_${j}`;
            tuples[user][role] = [];
            let permission;
            let endK = startK + 10;
            for (let k = startK; k < endK; k++, startK++) {
                permission = `permission_${k}`;
                tuples[user][role].push(permission);
            }
        }
    }

    const reader = Readable.from(JSON.stringify({ rbac: { tuples } }), { objectMode: false });
    const writer = createWriteStream('data.json');
    reader.pipe(writer);

    writer.on('finish', () => console.log('All writes are now complete.'))
    writer.on('error', (err) => console.error(err));
} catch (err) {
    console.error(err);
}
