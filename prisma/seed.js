import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
//
// async function seedMuscles() {
//   const primaryMuscles = [
//     'abdominals',
//     'hamstrings',
//     'adductors',
//     'quadriceps',
//     'biceps',
//     'shoulders',
//     'chest',
//     'middle back',
//     'calves',
//     'glutes',
//     'lower back',
//     'lats',
//     'triceps',
//     'traps',
//     'forearms',
//     'neck',
//     'abductors'
//   ];
//   const secondaryMuscles = [
//     'calves',
//     'shoulders',
//     'glutes',
//     'hamstrings',
//     'quadriceps',
//     'forearms',
//     'abductors',
//     'adductors',
//     'biceps',
//     'lower back',
//     'traps',
//     'lats',
//     'chest',
//     'middle back',
//     'neck'
//   ];
//
//   Promise.all(primaryMuscles.map((x) => prisma.primaryMuscle.create({ data: { name: x } })))
//     .then(() => console.info('[SEED] Succussfully created primary muscles'))
//     .catch((e) => console.error('[SEED] Failed to create primary muscles', e));
//
//   Promise.all(secondaryMuscles.map((x) => prisma.secondaryMuscle.create({ data: { name: x } })))
//     .then(() => console.info('[SEED] Succussfully created secondary muscles'))
//     .catch((e) => console.error('[SEED] Failed to create secondary muscles', e));
// }
//
function printUnique(json) {
  const force = [...new Set(json.map((x) => x.force))];
  const level = [...new Set(json.map((x) => x.level))];
  const category = [...new Set(json.map((x) => x.category))];
  const mechanic = [...new Set(json.map((x) => x.mechanic))];
  const equipment = [...new Set(json.map((x) => x.equipment))];
  console.log([...new Set(json.map((x) => x.primaryMuscles).flat(Infinity))]);
  console.log([...new Set(json.map((x) => x.secondaryMuscles).flat(Infinity))]);

  console.log('force {}', force);
  console.log('level {}', level);
  console.log('category {}', category);
  console.log('mechanic {}', mechanic);
  console.log('equipment {}', equipment);
}

// const waitFor = (timeout) => {
//   return new Promise((resolve) => setTimeout(resolve, timeout));
// };
//
// function retry(promise, onRetry, maxRetries, timeout = 1000) {
//   async function retryWithCount(retries) {
//     try {
//       if (retries > 0) {
//         console.log(`waiting for ${timeout}`);
//         await waitFor(timeout);
//       }
//       return await promise();
//     } catch (err) {
//       if (retries < maxRetries) {
//         onRetry();
//         return retryWithCount(retries + 1);
//       } else {
//         console.error('Max retries reached');
//         throw err;
//       }
//     }
//   }
//
//   return retryWithCount(0);
// }
//
// const resetTable = (tableName) => {
//   console.log(`Resetting ${tableName}...`);
//   return async () =>
//     await prisma.$queryRawUnsafe(`Truncate "${tableName}" restart identity cascade;`);
// };
//
// const seedExercise = (item) => {
//   return async () =>
//     await prisma.exercise.create({
//       data: {
//         name: item.name,
//         force: typeof item.force == 'object' ? item.force : item.force.replaceAll(' ', '_'),
//         level: typeof item.level == 'object' ? item.level : item.level.replaceAll(' ', '_'),
//         mechanic:
//           typeof item.mechanic == 'object' ? item.mechanic : item.mechanic.replaceAll(' ', '_'),
//         equipment:
//           typeof item.equipment == 'object'
//             ? item.equipment
//             : item.equipment.replaceAll('-', '').replaceAll(' ', '_'),
//         category:
//           typeof item.category == 'object' ? item.category : item.category.replaceAll(' ', '_'),
//         instructions: {
//           create: item.instructions.map((x) => ({
//             text: x
//           }))
//         },
//         images: {
//           create: item.images.map((x) => ({
//             url: x
//           }))
//         }
//       }
//     });
// };
//
// const connectToPrimaryMuscle = (exerciseId, muscle) => {
//   return async () =>
//     await prisma.exercisePrimaryMuscle.create({
//       data: {
//         exercise: {
//           connect: {
//             id: exerciseId
//           }
//         },
//         primaryMuscle: {
//           connectOrCreate: {
//             where: {
//               name: muscle
//             },
//             create: {
//               name: muscle
//             }
//           }
//         }
//       }
//     });
// };
//
// const connectToSecondaryMuscle = (exerciseId, muscle) => {
//   return async () =>
//     await prisma.exerciseSecondaryMuscle.create({
//       data: {
//         exercise: {
//           connect: {
//             id: exerciseId
//           }
//         },
//         secondaryMuscle: {
//           connectOrCreate: {
//             where: {
//               name: muscle
//             },
//             create: {
//               name: muscle
//             }
//           }
//         }
//       }
//     });
// };
//
// const seedExerciseBatch = async (json) => {
//   await Promise.all(
//     json.map(async (exercise) => {
//       const exerciseResponse = await retry(
//         seedExercise(exercise),
//         () => {
//           console.log(`Retrying seed -  ${exercise.name}`);
//         },
//         5
//       );
//
//       await Promise.all(
//         exercise.primaryMuscles.map(async (muscle) => {
//           const connectToMuscle = await retry(
//             connectToPrimaryMuscle(exerciseResponse.id, muscle),
//             () => {
//               console.log(`Retrying connect to primary muscle ${exercise.name} and ${muscle}`);
//             },
//             5
//           );
//           console.log(connectToMuscle);
//         })
//       );
//
//       await Promise.all(
//         exercise.secondaryMuscles.map(async (muscle) => {
//           const connectToMuscle = await retry(
//             connectToSecondaryMuscle(exerciseResponse.id, muscle),
//             () => {
//               console.log(`Retrying connect to secondary muscle ${exercise.name} and ${muscle}`);
//             },
//             5
//           );
//         })
//       );
//     })
//   );
// };
//
// async function main() {
//   const json = JSON.parse(fs.readFileSync('./prisma/exercises.nd.json', 'utf8'));
//   // const json = [JSON.parse(fs.readFileSync('./prisma/exercises.nd.json', 'utf8'))[0]]
//   const tables = [
//     'Exercise',
//     'Image',
//     'Instruction',
//     'ExercisePrimaryMuscle',
//     'ExerciseSecondaryMuscle'
//   ];
//
//   try {
//     await Promise.all(
//       tables.map(async (table) => {
//         await retry(
//           resetTable(table),
//           () => {
//             console.log(`Retrying Table Reset - ${table}`);
//           },
//           5
//         );
//       })
//     );
//   } catch (err) {
//     console.log(`Error resetting tables`, err);
//     throw err;
//   }
//
//   try {
//     let position = 0;
//     let count = 0
//     const batchSize = 10
//     while (position < json.length) {
//       console.log("Processing batch...", count)
//       const batchJson = json.slice(position, position + batchSize);
//       await seedExerciseBatch(batchJson);
//       position += batchSize;
//       count += 1
//     }
//   } catch (err) {
//     console.log(`Error seeding Exercise \n\n${err}`);
//     throw err;
//   }
// }

const main = () => {
  const json = JSON.parse(fs.readFileSync('./prisma/exercises.nd.json', 'utf8'));

  printUnique(json)
}
main();
