import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "Un premier RDV",
    image:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcThCMKY5sQPqlV0yd3Zcy_bcpzZ9mGm1bRPES0uLw_4QPqhr2_GwM2kGMwYikVBajPi",
    address: "Une adresse 5, 12345 une Ville",
    desciption: "C'est un premier RDV!",
  },
  {
    id: "m2",
    title: "Un 2eme RDV",
    image:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcThCMKY5sQPqlV0yd3Zcy_bcpzZ9mGm1bRPES0uLw_4QPqhr2_GwM2kGMwYikVBajPi",
    address: "Une adresse 12, 12345 une Ville",
    desciption: "C'est un second RDV!",
  },
];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Photos</title>
        <meta name='description' content='Uploadez vos plus beaux clichés'/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://jeanro2b:cmdrate2012@cluster0.xcf5fdg.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups"); // on peut donner le nom que l'on veut

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
