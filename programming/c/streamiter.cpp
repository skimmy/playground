#include <iostream>
#include <iterator>

using namespace std;

int
main(int argc, char** argv)
{
  // From the cpprefereference.com website:
  // "When reading characters, std::istream_iterator skips whitespace
  // by default [...] "
  istream_iterator<string> ist(cin);
  while(ist != istream_iterator<string>()) {
    cout << *ist << "\n";
    ist++;
  }
  return 0;
}
