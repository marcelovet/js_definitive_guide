const main = (num) => {
  console.log(`half of ${num} is ${num / 2}`);
  console.log('\u{1F600}');
  console.log(--num > 3);
  console.log(2 == '2');
  console.log(2 === '2');
  console.log(2 >= '2');
  console.log(2 == '2' && 3 === '3');
  console.log(2 == '2' || 3 === '3');
  console.log(2 == '2' || 3 === '3' ? 'is true' : 'is false');
};

main(4);
