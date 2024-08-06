import React from 'react';
import {Text, StyleSheet} from 'react-native';

export function H1({children, style, ...others}) {
  return <Text {...others} children={children} style={styles.h1} />;
}

export function H2({children, style, ...others}) {
  return (
    <Text {...others} children={children} style={{...styles.h2, ...style}} />
  );
}

export function H3({children, style, ...others}) {
  return (
    <Text {...others} children={children} style={{...styles.h3, ...style}} />
  );
}

export function H4({children, style}) {
  return <Text children={children} style={{...styles.h4, ...style}} />;
}

export function H5({children, style, ...others}) {
  return (
    <Text {...others} children={children} style={{...styles.h5, ...style}} />
  );
}

export function H6({children, style, ...others}) {
  return (
    <Text {...others} children={children} style={{...styles.h6, ...style}} />
  );
}

export function P({children, style, ...others}) {
  return (
    <Text {...others} children={children} style={{...styles.p, ...style}} />
  );
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'Roboto-Bold',
    fontSize: 26,
  },

  h2: {
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
  },

  h3: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: '#000',
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 16,
  },

  h4: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#000',
  },

  h5: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
  },

  h6: {
    fontFamily: 'Roboto-Medium',
    fontSize: 10,
  },

  p: {
    fontFamily: 'Roboto-Regular',
    color: '#939598',
    fontSize: 12,
    marginTop: 11,
  },
});
