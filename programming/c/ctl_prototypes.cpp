#include <vector>
#include <iostream>
#include <fstream>

// The only requirement for ReadT_ is to accept list initializer for
// the three strings.
template <typename ReadT_, typename StreamT_>
ReadT_
next_fastq_read(StreamT_& is) {
  std::string header {""};
  std::string bases  {""};
  std::string qhead  {""};
  std::string quals  {""};
  std::getline(is, header);
  std::getline(is, bases);
  std::getline(is, qhead);
  std::getline(is, quals);
  return ReadT_({header, bases, quals});
}

int
main(int argc, char** argv) {
  std::ifstream ifs("fake.fastq");
  while(ifs) {
    std::vector<std::string> read  = next_fastq_read<std::vector<std::string>, std::ifstream>(ifs);
    if (read[1].empty()) {
      break;
    }
    for (auto x : read) {
      std::cout << x << "\n";
    }
    std::cout << "\n";
  }
  return 0;
}
